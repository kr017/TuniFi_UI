import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/FavoriteOutlined";
export function PinIcon({ isPined, handlePinClick }) {
  return (
    <div>
      <IconButton onClick={handlePinClick}>
        <FavoriteIcon
          style={
            {
              //color: isPined ? "primary" : "secondary",
              // backgroundColor: isPined ? "blue" : "red",
            }
          }
        />
      </IconButton>
    </div>
  );
}
