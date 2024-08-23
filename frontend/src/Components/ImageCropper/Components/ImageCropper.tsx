import { Box, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';

type ImageCropperProps = {
  image: string;
  onCropCompleteHandler: (_croppedArea: Area, croppedAreaPixels: Area) => void;
  aspectRatio: number;
  width: number;
  height: number;
  cropShape: "rect" | "round"
}

const ImageCropper = (props: ImageCropperProps) => {
  const { image, onCropCompleteHandler, aspectRatio, width, height, cropShape } = props;
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onZoomChange = (zoom: number | number[]) => {
    setZoom(zoom as number);
  };
  
  return (
    <Stack
      margin={"20px 0"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        position={"relative"}
        maxWidth={width}
        maxHeight={height}
        width="100%"
        height={"100%"}
        sx={{ aspectRatio }}
        marginBottom={"20px"}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
          cropShape={cropShape}
        />
      </Box>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={2}
        alignSelf={"stretch"}
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
    </Stack>
  );
};

export default ImageCropper;
