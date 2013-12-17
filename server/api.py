import datetime

from flask import Flask, request, abort
from flask.ext.restful import Api, Resource, reqparse, fields, marshal

app = Flask(__name__)
api = Api(app)

posts = []

post_fields = {
    'id': fields.Integer,
    'author': fields.String,
    'datetime': fields.DateTime,
    'text': fields.String,
    'uri': fields.Url('post')
}


def get_new_post_id():
    try:
        return posts[-1]['id'] + 1
    except IndexError:
        return 1


def get_posts_newer_than(id):
    new_posts = []
    for post in posts:
        if post['id'] > int(id):
            new_posts.append(post)
    return new_posts


class PostListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('author', type=str, required=True,
                                   help='No author provided', location='json')
        self.reqparse.add_argument('text', type=str, required=True,
                                   help='No post text provided', location='json')
        super(PostListAPI, self).__init__()

    def get(self):
        args = request.args

        # return those only newer than the specified id
        if 'new' in args:
            new_posts = get_posts_newer_than(args['new'])
            return {'posts': list(map(lambda p: marshal(p, post_fields), new_posts))}

        # return all posts
        return {'posts': list(map(lambda p: marshal(p, post_fields), posts))}

    def post(self):
        args = self.reqparse.parse_args()
        post = {
            'id': get_new_post_id(),
            'author': args['author'],
            'datetime': datetime.datetime.now(),
            'text': args['text']
        }
        posts.append(post)
        return {'post': marshal(post, post_fields,)}, 201


class PostAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('author', type=str, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(PostAPI, self).__init__()

    def get(self, id):
        post = list(filter(lambda p: p['id'] == id, posts))
        if len(post) == 0:
            abort(404)
        return {'post': marshal(post[0], post_fields)}

    def put(self, id):
        post = list(filter(lambda p: p['id'] == id, posts))
        if len(post) == 0:
            abort(404)
        post = post[0]
        args = self.reqparse.parse_args()
        for k, v in args.items():
            if v is not None:
                post[k] = v
        return {'post': marshal(post, post_fields)}

    def delete(self, id):
        post = list(filter(lambda p: p['id'] == id, posts))
        if len(post) == 0:
            abort(404)
        posts.remove(post[0])
        return {'result': True}

api.add_resource(PostListAPI, '/liveblog/api/1.0/posts', endpoint='posts')
api.add_resource(PostAPI, '/liveblog/api/1.0/posts/<int:id>', endpoint='post')

if __name__ == '__main__':
    app.run(debug=True)
