export default function Custom404() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0f172a",
      color: "#f1f5f9",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.25rem" }}>Page Not Found</p>
      <a href="/" style={{
        marginTop: "1rem",
        background: "#2563eb",
        color: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        Go Home
      </a>
    </div>
  );
}
