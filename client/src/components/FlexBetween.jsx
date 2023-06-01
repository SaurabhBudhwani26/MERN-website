import { Box } from "@mui/material";
import  styled  from "@mui/styled-engine";

const FlexBetween = styled(Box)({
    // this styled and box are good if you are using css as a component
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;

// THIS WILL HELP US ALIGN AND FLEX THINGS BETWEEN COMPONENTS