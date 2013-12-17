# Liveblog Demo

Simple proof-of-concept AngularJS + Flask live blogging platform to learn 
AngularJS and play with Flask. This is just a demonstration, no database, 
no security, no authentication, etc!

## Requirements
- Python 3.3.2
- node.js 0.10.23
- Flask 0.10.1
- Flask-RESTful 0.2.7
- Grunt 0.4.2

## Installation

Navigate to the server directory, run ```pip install -r requirements.txt```,
then navigate to the client directory and run ```npm install```.

## Usage

Navigate to the server directory and run ```python api.py``` to get the server 
started, currently must be run on 127.0.0.1:5000, which is the Flask default.
Then, navigate to the client directory and run ```grunt build```, and open 
index.html in client/dist/.

### Note for use in Google Chrome
Running the server plus the client HTML in Chrome will not work due to 
Cross Origin Request Security. To get around this run Chrome with the 
```–disable-web-security``` argument.

### API Endpoints

| HTTP Method   | URI                                 | Action                 |
|:------------: | ------------------------------------| -----------------------|
| GET           | /liveblog/api/1.0/posts             | Retrieve list of posts |
| GET           | /liveblog/api/1.0/posts/[post_id]   | Retrieve a post        |
| POST          | /liveblog/api/1.0/posts             | Create a new post      |
| PUT           | /liveblog/api/1.0/posts/[post_id]   | Update an existing post|
| DELETE        | /liveblog/api/1.0/posts/[post_id]   | Delete a post          |

Adding a new posts requires a JSON request with ```author``` and 
```text``` fields.

## Client Screenshots
![Interface with posts](https://raw.github.com/jordanvg/liveblog-demo/screenshots/screenshot1.png "Interface with posts")
![A server error](https://raw.github.com/jordanvg/liveblog-demo/screenshots/screenshot2.png "A server error")

## TODO
- Create demo that does not rely on server running
- Add client unit tests for AngularJS
- Create server factory for AngularJS http requests
- Move alerts and new posts to directives
- Improve client handling when server down
