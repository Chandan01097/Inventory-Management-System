import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
export const Loading = ({ text = "Loading…" }) => (
  <div className="loading">
    <LoaderCircle size={20} />
    {text}
  </div>
);
export const Notice = ({ type = "error", children }) => (
  <div className={`notice ${type}`}>
    <>
      {type === "success" ? (
        <CheckCircle2 size={19} />
      ) : (
        <AlertCircle size={19} />
      )}
    </>
    {children}
  </div>
);
export const Empty = ({ children = "No data found." }) => (
  <div className="empty">{children}</div>
);
export const PageIntro = ({ title, children, action }) => (
  <div className="page-intro">
    <div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
    {action}
  </div>
);
