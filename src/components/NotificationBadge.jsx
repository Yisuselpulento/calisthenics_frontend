const NotificationBadge = ({ count }) => {

  if (!count || count <= 0) return null;

  return (
    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
      {count}
    </span>
  ); 
};

export default NotificationBadge;
