import { useMediaQuery } from "@mui/material";

const useLargeMedia = () => {
  const largeMedia = useMediaQuery("(min-width:850px)");
  return largeMedia
}

export default useLargeMedia
