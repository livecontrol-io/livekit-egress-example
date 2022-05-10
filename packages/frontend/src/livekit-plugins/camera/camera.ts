import Konva from 'konva';
import type { PluginFunction } from '../types';
import { info } from './constants';

export const plugin: PluginFunction = async (container, events) => {
  console.log('Plugin', container);
  let image: Konva.Image;

  const wrapper = document.createElement('div');
  wrapper.classList.add('flex', 'flex-col', 'gap-y-10');

  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;

  const select = document.createElement('select');

  wrapper.append(select, video);

  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind === 'videoinput'
  );

  function handleUpdateLayer() {
    image.getLayer()?.batchDraw();
    requestAnimationFrame(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleUpdateLayer();
    });
  }

  const handleRender = () => {
    const group = new Konva.Group();
    image = new Konva.Image({
      image: video,
      x: 50,
      y: 100,
      draggable: true,
    });

    video.addEventListener('loadedmetadata', () => {
      image.width(video.videoWidth);
      image.height(video.videoHeight);
    });

    video.addEventListener('canplay', () => {
      void video.play();
    });

    group.add(image);

    events?.onAddLayer?.({
      plugin: info.id,
      element: group,
    });

    handleUpdateLayer();
  };

  const handleAppendVideo = async () => {
    video.pause();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: select.value,
      },
    });
    video.srcObject = stream;
    handleRender();
  };

  select.onchange = handleAppendVideo;

  select.classList.add('select');
  devices.forEach((device) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.innerText = device.label;
    option.classList.add('btn');

    select.append(option);
  });
  select.selectedIndex = 0;

  container.append(wrapper);

  void handleAppendVideo();
};
