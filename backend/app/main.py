from fastapi import FastAPI

app = FastAPI(
    title="AI Interior Designer API",
    description="Backend API for the AI-Powered Virtual Interior Design and Product Visualization System",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "AI Interior Designer API is running!",
        "status": "ok",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }