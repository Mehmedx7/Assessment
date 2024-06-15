# from django.test import TestCase
# from django.contrib.auth.models import User
# from rest_framework.test import APIClient
# from rest_framework_simplejwt.tokens import RefreshToken
# from .models import Book
# from datetime import date, timedelta

# class BookModelTest(TestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(username='testuser', password='testpass')
#         self.book = Book.objects.create(
#             title='Test Book',
#             author='Test Author',
#             published_date=date.today(),
#             isbn='1234567890123',
#             user=self.user
#         )

#     def test_book_creation(self):
#         self.assertEqual(self.book.title, 'Test Book')
#         self.assertEqual(self.book.author, 'Test Author')
#         self.assertEqual(self.book.published_date, date.today())
#         self.assertEqual(self.book.isbn, '1234567890123')
#         self.assertEqual(self.book.user, self.user)

# class BookAPITest(TestCase):

#     def setUp(self):
#         self.user = User.objects.create_user(username='testuser', password='testpass')
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)

#         self.book = Book.objects.create(
#             title='Test Book',
#             author='Test Author',
#             published_date=date.today(),
#             isbn='1234567890123',
#             user=self.user
#         )

#     def get_tokens_for_user(self, user):
#         refresh = RefreshToken.for_user(user)
#         return {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }

#     def test_get_books(self):
#         response = self.client.get('/api/books/')
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['title'], 'Test Book')

#     def test_create_book(self):
#         data = {
#             'title': 'New Test Book',
#             'author': 'New Test Author',
#             'published_date': (date.today() - timedelta(days=1)).isoformat(),
#             'isbn': '1234567890124'
#         }
#         response = self.client.post('/api/books/', data, format='json')
#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(Book.objects.count(), 2)
#         self.assertEqual(Book.objects.get(id=response.data['id']).title, 'New Test Book')

#     def test_create_book_invalid_isbn(self):
#         data = {
#             'title': 'Invalid ISBN Book',
#             'author': 'Test Author',
#             'published_date': date.today().isoformat(),
#             'isbn': '12345'
#         }
#         response = self.client.post('/api/books/', data, format='json')
#         self.assertEqual(response.status_code, 400)
#         self.assertIn('isbn', response.data)

#     def test_create_book_future_published_date(self):
#         future_date = (date.today() + timedelta(days=1)).isoformat()
#         data = {
#             'title': 'Future Published Date Book',
#             'author': 'Test Author',
#             'published_date': future_date,
#             'isbn': '1234567890125'
#         }
#         response = self.client.post('/api/books/', data, format='json')
#         self.assertEqual(response.status_code, 400)
#         self.assertIn('published_date', response.data)

#     def test_update_book(self):
#         data = {
#             'title': 'Updated Test Book',
#             'author': 'Updated Author',
#             'published_date': self.book.published_date.isoformat(),
#             'isbn': self.book.isbn
#         }
#         response = self.client.put(f'/api/books/{self.book.id}/', data, format='json')
#         self.assertEqual(response.status_code, 200)
#         self.book.refresh_from_db()
#         self.assertEqual(self.book.title, 'Updated Test Book')

#     def test_delete_book(self):
#         response = self.client.delete(f'/api/books/{self.book.id}/')
#         self.assertEqual(response.status_code, 204)
#         self.assertEqual(Book.objects.count(), 0)