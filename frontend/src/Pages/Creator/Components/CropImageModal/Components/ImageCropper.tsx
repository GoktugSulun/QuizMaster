import { Box, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';

type ImageCropperProps = {
  image: string;
  onCropCompleteHandler: (_croppedArea: Area, croppedAreaPixels: Area) => void;
}

const ImageCropper = ({ image, onCropCompleteHandler }: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onZoomChange = (zoom: number | number[]) => {
    setZoom(zoom as number);
  };
  
  return (
    <Box margin={"20px 0"}>
      <Box
        position={"relative"}
        width={600}
        height={400}
        marginBottom={"20px"}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={3 / 2}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
        />
      </Box>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Typography color={"primary.main"} fontWeight={"bold"} > Zoom </Typography>
        <Slider
          title="Zoom"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(_, zoom) => onZoomChange(zoom)}
        />
      </Stack>
    </Box>
  );
};

export default ImageCropper;
