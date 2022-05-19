import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Group, Layer, Stage } from 'react-konva';
import type { Props } from './types';

export const Canvas = ({
  className,
  onMediaLoad,
  elements = [],
  ...props
}: Props) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement>();
  const [layer, setLayer] =
    useState<ReturnType<typeof Layer['getNativeNode']>>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const { clientWidth: width = 0, clientHeight: height = 0 } = wrapper ?? {};

  useEffect(() => {
    if (!canvas) return;
    const stream = canvas.captureStream();
    onMediaLoad?.(stream);
  }, [canvas, onMediaLoad]);

  useEffect(() => {
    if (!layer) return;

    elements.forEach((element) => {
      layer.add(element.element);
    });
  }, [layer, elements]);

  return (
    <div
      className={cn('flex w-full h-full', className)}
      ref={(ref) => setWrapper(ref ?? undefined)}
      {...props}
    >
      <Stage width={width} height={height}>
        <Layer
          ref={(layer) => {
            setLayer(layer?.getLayer() ?? undefined);
            setCanvas(layer?.getContext().canvas._canvas);
          }}
        >
          {elements?.map((element) => (
            <Group key={element.plugin} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
