// components/UserAvatar.jsx
export default function UserAvatar({ nameOrEmail }) {
  if (!nameOrEmail) return null;

  // Extract initials
  const parts = nameOrEmail.split(/[ .@]/).filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join("");

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
      {initials}
    </div>
  );
}
