const ButtonSubmit = ({
  children,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 text-sm bg-primary hover:bg-primary/80 transition`}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
