import datetime
import unittest

import api


class TestCase(unittest.TestCase):
    def setUp(self):
        self.app = api.app.test_client()
        api.posts.append(
            {
                'id': 1,
                'author': 'Jack Kerouac',
                'datetime': datetime.datetime.now(),
                'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
            }
        )

    def tearDown(self):
        pass

    def test_create_post(self):
        rv = self.app.post('/liveblog/api/1.0/posts',
                            data=dict(
                                author='Luke Rhinehart',
                                text='Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
                            ))
        assert b'No author provided' not in rv.data
        assert b'No post text provided' not in rv.data
        assert rv.status_code == 201

    def test_create_post_no_author(self):
        rv = self.app.post('/liveblog/api/1.0/posts',
                            data=dict(
                                text='Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
                            ))
        assert b'No author provided' in rv.data
        assert rv.status_code == 400

    def test_create_post_no_text(self):
        rv = self.app.post('/liveblog/api/1.0/posts',
                            data=dict(
                                author='Luke Rhinehart'
                            ))
        assert b'No post text provided' in rv.data
        assert rv.status_code == 400

    def test_list_posts(self):
        rv = self.app.get('/liveblog/api/1.0/posts')
        assert rv.status_code == 200

    def test_list_new_posts(self):
        api.posts.append(
            {
                'id': 2,
                'author': 'Hunter S. Thompson',
                'datetime': datetime.datetime.now(),
                'text': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
            }
        )
        rv = self.app.get('/liveblog/api/1.0/posts?new=1')
        assert rv.status_code == 200

    def test_retrieve_post(self):
        rv = self.app.get('/liveblog/api/1.0/posts/1')
        assert rv.status_code == 200

    def test_update_post(self):
        rv = self.app.put('/liveblog/api/1.0/posts/1',
                            data=dict(
                                author='Hunter S. Thompson',
                            ))
        assert rv.status_code == 200

    def test_delete_post(self):
        rv = self.app.delete('/liveblog/api/1.0/posts/1')
        assert rv.status_code == 200

if __name__ == '__main__':
    unittest.main()
