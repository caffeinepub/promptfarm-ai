interface CategoryIconProps {
  iconIndex: number;
  className?: string;
}

export default function CategoryIcon({ iconIndex, className = '' }: CategoryIconProps) {
  const spriteUrl = '/assets/generated/categories-icons-sprite.dim_1024x1024.png';
  const iconsPerRow = 4;
  const iconSize = 256;
  const row = Math.floor(iconIndex / iconsPerRow);
  const col = iconIndex % iconsPerRow;
  const x = col * iconSize;
  const y = row * iconSize;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: '64px',
        height: '64px',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${spriteUrl})`,
          backgroundPosition: `-${x}px -${y}px`,
          backgroundSize: '1024px 1024px',
          width: '1024px',
          height: '1024px',
          transform: 'scale(0.0625)',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}
