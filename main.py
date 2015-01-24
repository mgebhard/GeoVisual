import webapp2
import jinja2
import os
import re
import logging
from google.appengine.ext import ndb
from google.appengine.api import users
from datetime import date, datetime

jinja_environment = jinja2.Environment(loader=
    jinja2.FileSystemLoader(os.path.dirname(__file__)))


def RenderTemplate(template_file, values={}):
    template = jinja_environment.get_template(template_file)
    
    return template.render(values)


class HomeHandler(webapp2.RequestHandler): 
    def get(self):
        self.response.out.write(RenderTemplate('salesforcemaps.html', 
                                {}))


routes = [
    ('/', HomeHandler),
]

app = webapp2.WSGIApplication(routes, debug=True)