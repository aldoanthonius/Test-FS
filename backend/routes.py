from flask import request, jsonify
from models import db, Posts
from app import app

# Endpoint untuk membuat artikel
@app.route('/article/', methods=['POST'])
def create_article():
    data = request.get_json()
    
    if not data.get('title') or len(data['title']) < 20:
        return jsonify({'error': 'Title harus minimal 20 karakter'}), 400
    if not data.get('content') or len(data['content']) < 200:
        return jsonify({'error': 'Content harus minimal 200 karakter'}), 400
    if not data.get('category') or len(data['category']) < 3:
        return jsonify({'error': 'Category harus minimal 3 karakter'}), 400
    if data.get('status') not in ['publish', 'draft', 'thrash']:
        return jsonify({'error': 'Status harus salah satu dari publish, draft, thrash'}), 400

    new_post = Posts(
        title=data['title'],
        content=data['content'],
        category=data['category'],
        status=data['status']
    )
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify({'message': 'Artikel berhasil dibuat'}), 201

# Endpoint untuk mendapatkan daftar artikel dengan pagination
@app.route('/article/<int:limit>/<int:offset>', methods=['GET'])
def get_articles(limit, offset):
    posts = Posts.query.limit(limit).offset(offset).all()
    result = [{'title': p.title, 'content': p.content, 'category': p.category, 'status': p.status} for p in posts]
    
    return jsonify(result), 200

# Endpoint untuk mendapatkan artikel berdasarkan ID
@app.route('/article/<int:id>', methods=['GET'])
def get_article(id):
    post = Posts.query.get(id)
    if not post:
        return jsonify({'error': 'Artikel tidak ditemukan'}), 404
    
    return jsonify({
        'title': post.title,
        'content': post.content,
        'category': post.category,
        'status': post.status
    }), 200

# Endpoint untuk mengupdate artikel berdasarkan ID
@app.route('/article/<int:id>', methods=['PUT', 'PATCH'])
def update_article(id):
    post = Posts.query.get(id)
    if not post:
        return jsonify({'error': 'Artikel tidak ditemukan'}), 404
    
    data = request.get_json()
    
    if 'title' in data and len(data['title']) < 20:
        return jsonify({'error': 'Title harus minimal 20 karakter'}), 400
    if 'content' in data and len(data['content']) < 200:
        return jsonify({'error': 'Content harus minimal 200 karakter'}), 400
    if 'category' in data and len(data['category']) < 3:
        return jsonify({'error': 'Category harus minimal 3 karakter'}), 400
    if 'status' in data and data['status'] not in ['publish', 'draft', 'thrash']:
        return jsonify({'error': 'Status harus salah satu dari publish, draft, thrash'}), 400

    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    post.category = data.get('category', post.category)
    post.status = data.get('status', post.status)
    
    db.session.commit()
    return jsonify({'message': 'Artikel berhasil diperbarui'}), 200

# Endpoint untuk menghapus artikel berdasarkan ID
@app.route('/article/<int:id>', methods=['DELETE'])
def delete_article(id):
    post = Posts.query.get(id)
    if not post:
        return jsonify({'error': 'Artikel tidak ditemukan'}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Artikel berhasil dihapus'}), 200


# Endpoint untuk mengambil article berdasarkan status
@app.route('/article/status/<string:status>', methods=['GET'])
def get_articles_by_status(status):
    posts = Posts.query.filter_by(status=status).all()
    result = [{'id': p.id, 'title': p.title, 'category': p.category, 'status': p.status} for p in posts]
    
    return jsonify(result), 200
