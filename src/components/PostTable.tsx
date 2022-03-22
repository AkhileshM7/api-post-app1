import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { ClassNameMap } from "@mui/material";
// import  Pagination  from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

export type posttype = any[];



type datatype = {
  author: string;
  created_at: string;
  title: string;
  url: string;
  objectID: string;
};

const useStyles = makeStyles(() => ({
  box: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pageNum: {
    justifyContent: "center",
    alignItems: "center",
    display:'flex'
  },
  
  
}));

const PostTable = (): JSX.Element => {
  const [data, setData] = useState<any>("");
  let counter: number = 0;
  let interval: NodeJS.Timer;
  const navigate: NavigateFunction = useNavigate();
  const [page, setPage] = useState(1);
  const classes: ClassNameMap = useStyles();

  const apiRequest = () => {
    axios
      .get(
        "http://hn.algolia.com/api/v1/search?query=search_by_data&page=" +
          counter
      )
      .then((res) => {
        console.log("response", res);
        console.log(res?.data?.exhaustiveNbHits);
        if (res?.data?.exhaustiveNbHits) {
          setData((prev: any) => [...prev, res?.data?.hits]);
          counter = counter + 1;
        } else {
          clearInterval(interval);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });

  };



  const handleSubmit = (JSONData: datatype) => {
    navigate("jsonData", { state: JSONData });
  };

  useEffect(() => {
    apiRequest();
    interval = setInterval(apiRequest, 10000);
  }, []);

  useEffect(() => {
    // console.log("data1223", data);
  }, [data]);

  useEffect(() => {
    // console.log("count", counter);
  }, [counter]);
  return (
    <div>
      {/* {console.log("data", data)} */}
      <Box className={classes.box}>
        {data.length > 0 ? (
          <TableContainer style={{ height: 700 }} component={Paper}>
            <Table stickyHeader>
              <TableHead >
                <TableCell align="center">TITLE</TableCell>
                <TableCell align="center">URL</TableCell>
                <TableCell align="center">CREATED AT</TableCell>
                <TableCell align="center">AUTHOR</TableCell>
                <TableCell align="center">Raw DATA</TableCell>
              </TableHead>
              <TableBody>
                {data[page - 1].map(
                  (item: any): JSX.Element => (
                    <TableRow   key={item.objectID}>
                      <TableCell>{item.story_title}</TableCell>
                      <TableCell>{item.story_url}</TableCell>
                      <TableCell>{item.created_at}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleSubmit(item)}>
                          select
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}
      </Box>
      <Pagination className={classes.pageNum}
        page={page}
        count={data.length}
        onChange={(e: any, selectedPage: number) => {
          console.log("abc", selectedPage);
          setPage(selectedPage);
        }}
      />
    </div>
  );
};
export default PostTable;
