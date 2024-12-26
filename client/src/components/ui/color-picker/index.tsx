import { CSSProperties } from 'react';
import styles from './styles.module.scss';

type ColorPickerProps<TColor extends string> = {
  colorKeys: readonly TColor[];
  currentColor: TColor | null;
  onSelectColor: (color: TColor | null) => Promise<void> | void;
  noColorLabel?: string;
  noColorClassName?: string;
  className?: string;
  colorVarPrefix?: string;
};

export function ColorPicker<TColor extends string>({
  colorKeys,
  currentColor,
  onSelectColor,
  noColorLabel = 'Без цвета',
  noColorClassName,
  className,
  colorVarPrefix = '--status-column',
}: ColorPickerProps<TColor>) {
  const hasColor = Boolean(currentColor);

  return (
    <div className={`${styles.ColorPicker} ${className || ''}`}>
      <button
        type="button"
        className={`${styles.ColorPicker__reset} ${noColorClassName || ''} ${!hasColor ? styles.ColorPicker__reset_active : ''}`}
        onClick={async () => {
          await onSelectColor(null);
        }}
      >
        {noColorLabel}
      </button>
      <div className={styles.ColorPicker__grid}>
        {colorKeys.map((colorKey) => (
          <button
            key={colorKey}
            type="button"
            className={`${styles.ColorPicker__swatch} ${currentColor === colorKey ? styles.ColorPicker__swatch_active : ''}`}
            aria-label={`Цвет ${colorKey}`}
            title={colorKey}
            style={{
              '--swatch-color': `var(${colorVarPrefix}-${colorKey})`,
            } as CSSProperties}
            onClick={async () => {
              await onSelectColor(colorKey);
            }}
          />
        ))}
      </div>
    </div>
  );
}
