# Ionic Laravel Starter
## Running the Ionic FrontEnd
Follow these steps to run the Ionic frontend:
1. **npm Install**: Install npm packages by running the following command in your terminal or command prompt:
2. **ionic serve**: Start the Ionic frontend by running the following command:

## Running the Laravel Backend

Follow these steps to run the Laravel backend:

1. **composer install**: Install the necessary PHP dependencies by running the following command in your terminal or command prompt:
2. **php artisan migrate**: Run database migrations to create database tables. This command will create the tables specified in your migration files. If you haven't already configured your database connection, make sure to do that in your `.env` file before running migrations.
This will launch a local development server, and you can access your Laravel application through the provided URL (usually http://localhost:8000/).
3. **php artisan serve**: Start the Laravel development server by running the following command:
If you need to specify a different host or port, you can do so by passing the `--host` and `--port` options, respectively, to the `serve` command.
