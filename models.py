from flask_sqlalchemy import SQLAlchemy  

db = SQLAlchemy()
"""Models for Cupcake app."""

DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"

class Cupcake(db.Model):
    """ Cupcakes. """

    __tablename__ = "cupcakes"

    def serialize(self):
        """ Format the data for JSON. """
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    flavor = db.Column(
        db.Text,
        nullable=False
    )

    size = db.Column(
        db.Text,
        nullable=False
    )

    rating = db.Column(
        db.Float,
        nullable=False
    )

    image = db.Column(
        db.Text,
        nullable=False,
        default = DEFAULT_IMAGE
    )

def connect_db(app):
    db.app = app
    db.init_app(app)