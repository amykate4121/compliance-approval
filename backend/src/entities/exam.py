# coding=utf-8

from sqlalchemy import Column, String
from marshmallow import Schema, fields
from .entity import Entity, Base


class Exam(Entity, Base):
    __tablename__ = 'report'

    sentence = Column(String)
    description = Column(String)
    fullBody = Column(String)

    def __init__(self, sentence, description, fullBody, created_by):
        Entity.__init__(self, created_by)
        self.sentence = sentence
        self.description = description
        self.fullBody = fullBody

# AMY EDIT HERE
class ExamSchema(Schema):
    id = fields.Number()
    sentence = fields.Str()
    description = fields.Str()
    fullBody = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()