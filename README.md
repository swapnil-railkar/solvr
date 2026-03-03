# 🪄 SolvR

> A stateless problem-solving assistant that generates structured hints or full solutions with intuition and complexity analysis.

SolvR helps developers think through coding problems by providing either progressive hints or complete solutions in a selected programming language. It is designed as a learning-first tool rather than a simple answer generator.

Try it yourself : http://solvr-280226.s3-website.ap-south-1.amazonaws.com/

---

## ✨ Features

- 🧠 Generate progressive hints (no spoilers)
- ✅ Generate full solution with:
    - Intuition
    - Approach explanation
    - Code
    - Time & Space Complexity
    - Data Structures used
- ⚙️ Language selection support
- 🔐 CAPTCHA-protected API
- 🚀 Serverless architecture
- 🧩 Single-page application (SPA)

---

## 🏗️ Architecture

```
React (Frontend - S3)
        ↓
API Gateway
        ↓
AWS Lambda (Java Backend)
        ↓
LLM Provider
```

### Frontend

- React (SPA)
- Hosted on AWS S3
- Single route (`/`)
- State-driven UI (no unnecessary routing)

### Backend

- Java-based AWS Lambda
- Stateless request processing
- CAPTCHA verification
- Prompt-controlled output formatting

---

## 🎯 Design Decisions

### Why Single Page Application?

The solution view is treated as a state transition rather than a navigational destination. This reduces complexity and avoids unnecessary routing overhead.

### Why Stateless?

- No persistence
- No user authentication
- Lightweight and scalable
- Suitable for serverless infrastructure
    

### Why CAPTCHA Instead of OTP?

CAPTCHA effectively prevents automated abuse while maintaining minimal friction for users. OTP-based verification was intentionally avoided to reduce infrastructure complexity.

---

## 🧠 Modes

### Hint Mode

- Intuition
- Progressive hints
- Option to reveal full solution

### Solution Mode

- Intuition
- Step-by-step approach
- Code implementation
- Time & Space complexity
- Data structures used

---

## 🔐 Security

- CAPTCHA verification (server-side validation)
- API Gateway rate limiting
- Input size limits
- Stateless backend

---

## 🚀 Deployment

### Frontend

- Build React app
- Deploy static assets to AWS S3

### Backend

- Java AWS Lambda
- Exposed via API Gateway
- Environment variables for API keys

---

## 🛠️ Tech Stack

- React
- Java
- AWS Lambda
- API Gateway
- AWS S3
- CAPTCHA service
- LLM API

---

## 📌 Future Enhancements

- Authentication & solution history
- Shareable solution links
- Streaming responses
- Multiple difficulty levels
- Comparison of approaches

---

## 💡 Motivation

SolvR was built to explore:

- Prompt engineering strategies
- Serverless architecture design
- Clean UX state modeling
- Practical API security patterns
- Learning-oriented AI interaction
