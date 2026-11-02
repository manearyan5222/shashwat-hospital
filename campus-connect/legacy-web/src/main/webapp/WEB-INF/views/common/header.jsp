<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CampusConnect - Legacy Java Web Portal (Servlet & JSP)</title>
    <style>
        :root {
            --primary: #1e3a8a;
            --primary-hover: #1e40af;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --success: #059669;
            --warning: #d97706;
            --danger: #dc2626;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            line-height: 1.5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        header {
            background-color: #0f172a;
            color: #ffffff;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #3b82f6;
        }
        .logo-area { display: flex; align-items: center; gap: 0.75rem; }
        .logo-badge {
            background: #2563eb;
            color: white;
            font-weight: 700;
            padding: 0.25rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            letter-spacing: 0.05em;
        }
        .site-title { font-size: 1.25rem; font-weight: 700; }
        nav { display: flex; gap: 1rem; align-items: center; }
        nav a {
            color: #94a3b8;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 0.4rem 0.75rem;
            border-radius: 4px;
            transition: all 0.2s;
        }
        nav a:hover, nav a.active { color: #ffffff; background-color: #1e293b; }
        .main-container {
            max-width: 1140px;
            margin: 2rem auto;
            padding: 0 1.5rem;
            flex: 1;
            width: 100%;
        }
        .banner {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-left: 4px solid #2563eb;
            border-radius: 6px;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
            font-size: 0.92rem;
            color: #1e3a8a;
        }
        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .table-responsive { overflow-x: auto; margin-top: 1rem; }
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        th, td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border);
            font-size: 0.92rem;
        }
        th { background: #f1f5f9; color: #475569; font-weight: 600; }
        tr:hover { background-color: #f8fafc; }
        .badge {
            display: inline-block;
            padding: 0.2rem 0.55rem;
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 600;
        }
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-primary { background: #dbeafe; color: #1e40af; }
        .badge-neutral { background: #f1f5f9; color: #475569; }
        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            border-radius: 6px;
            text-decoration: none;
            cursor: pointer;
            border: none;
            transition: background 0.2s;
        }
        .btn-primary { background: #2563eb; color: #ffffff; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
        .btn-secondary:hover { background: #e2e8f0; }
        .btn-danger { background: #ef4444; color: #ffffff; }
        .btn-danger:hover { background: #dc2626; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.35rem; font-size: 0.88rem; }
        .form-control {
            width: 100%;
            padding: 0.55rem 0.75rem;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 0.92rem;
        }
        .form-control:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
        .alert-error {
            background: #fee2e2;
            border: 1px solid #fca5a5;
            color: #991b1b;
            padding: 0.85rem 1rem;
            border-radius: 6px;
            margin-bottom: 1.25rem;
            font-size: 0.9rem;
        }
        .alert-success {
            background: #dcfce7;
            border: 1px solid #86efac;
            color: #166534;
            padding: 0.85rem 1rem;
            border-radius: 6px;
            margin-bottom: 1.25rem;
            font-size: 0.9rem;
        }
        .code-box {
            background: #1e293b;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.88rem;
            margin-top: 0.5rem;
            overflow-x: auto;
        }
        footer {
            background: #0f172a;
            color: #94a3b8;
            padding: 1.5rem 2rem;
            text-align: center;
            font-size: 0.85rem;
            margin-top: auto;
            border-top: 1px solid #1e293b;
        }
    </style>
</head>
<body>
    <header>
        <div class="logo-area">
            <span class="logo-badge">SERVLET + JSP</span>
            <div class="site-title">CampusConnect Legacy Web</div>
        </div>
        <nav>
            <a href="${pageContext.request.contextPath}/">Overview</a>
            <a href="${pageContext.request.contextPath}/students">Student MVC (JSTL)</a>
            <a href="${pageContext.request.contextPath}/students/new">Add Student (doPost)</a>
            <a href="${pageContext.request.contextPath}/lifecycle">Servlet Lifecycle</a>
            <a href="${pageContext.request.contextPath}/session">HttpSession</a>
        </nav>
    </header>
    <div class="main-container">
