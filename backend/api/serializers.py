from rest_framework import serializers
from .models import Book
from datetime import date

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'published_date', 'isbn', 'user']
        read_only_fields = ['user']

    # def validate_isbn(self, value):
    #     if len(value) != 13:
    #         raise serializers.ValidationError("ISBN must be 13 characters long.")
    #     user = self.context['request'].user
    #     if Book.objects.filter(isbn=value, user=user).exists():
    #         raise serializers.ValidationError("This ISBN already exists for your account.")
    #     return value
    
    def validate_published_date(self, value):

        if value > date.today():
            raise serializers.ValidationError("Published date cannot be in the future.")
        return value