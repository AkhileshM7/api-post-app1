import { Box, Button, makeStyles } from "@material-ui/core";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { ClassNameMap } from "@mui/material";


const useStyles=makeStyles(()=> ({
  box: {
    marginTop: 50
  }
}))

const RawJSON = (): JSX.Element => {
  const classes: ClassNameMap = useStyles();

  const navigate: NavigateFunction = useNavigate();
  const local: unknown = useLocation().state;
    const handleClick = () => {
        navigate(-1);
    }

  return (
    <Box>
      <Box  display="flex"  justifyContent="center" component={"h1"}>
        Raw JSON Data
      </Box>
      <Button variant="contained" onClick={handleClick}> Back </Button>
      <Box className={classes.box} >{JSON.stringify(local)}</Box>
     
    </Box>
  );
};
export default RawJSON;
