# Use an official lightweight Python image
FROM python:3.11-slim

# Set environment variables for production
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# --- THE DEFINITIVE FIX ---
# Use the efficient gthread worker but give it a very long timeout
# to handle the slow first request (lazy initialization).
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 300 app:app