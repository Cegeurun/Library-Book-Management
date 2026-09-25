from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.book_controller import router


app = FastAPI(title="Library Book Management API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
