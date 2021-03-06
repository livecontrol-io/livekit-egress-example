import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import type { PluginLayer } from '~/livekit-plugins';
import type { Props } from './types';

export const Canvas = ({
  className,
  onMediaLoad,
  elements = [],
  ...props
}: Props) => {
  const prevElements = useRef<PluginLayer[]>([]);
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

    prevElements.current.forEach((el) => el.element.remove());

    layer.draw();

    console.log('Updating layer...');

    elements.forEach((element) => {
      layer.add(element.element);
    });

    prevElements.current = elements;
  }, [layer, elements]);

  console.log(elements);

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
        />
      </Stage>
    </div>
  );
};
