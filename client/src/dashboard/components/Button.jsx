import React from "react";

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center font-medium justify-center rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const computedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled || loading ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={computedClasses}
      {...props}
    >
      {loading ? (
        <span className=" loader-small mr-2" /> // You can replace this with a real spinner
      ) : (
        leftIcon && <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
