$(document).ready(function() {
    $('#createBtn').click(function() {
       $.ajax({
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          type: 'POST',
          data: {
             name: 'New Product',
             price: 25.99,
             description: 'This is a new product'
          },
          success: function(data) {
             console.log('Product created successfully:', data);
          },
          error: function(error) {
             console.log('Error creating product:', error);
          }
       });
    });
 
    $('#readBtn').click(function() {
       $.ajax({
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          type: 'GET',
          success: function(data) {
             console.log('Products retrieved successfully:', data);
          },
          error: function(error) {
             console.log('Error retrieving products:', error);
          }
       });
    });
 
    $('#updateBtn').click(function() {
       $.ajax({
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          type: 'PUT',
          data: {
             name: 'Updated Product',
             price: 29.99,
             description: 'This product has been updated'
          },
          success: function(data) {
             console.log('Product updated successfully:', data);
          },
          error: function(error) {
             console.log('Error updating product:', error);
          }
       });
    });
 
    $('#deleteBtn').click(function() {
       $.ajax({
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          type: 'DELETE',
          success: function(data) {
             console.log('Product deleted successfully');
          },
          error: function(error) {
             console.log('Error deleting product:', error);
          }
       });
    });
 });
 