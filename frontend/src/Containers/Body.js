import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Grid from "@mui/material/Grid"

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import InfoTable from './InfoTable'
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addInfo, queryInfo, clearQueryInfo, updateAddInfo, updateQueryInfo, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);
  
  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [value, setValue] = useState('1');
  // const [addInfo, setAddInfo] = useState([]);
  // const [queryInfo, setQuerydInfo] = useState([]);

  const handleTabChange = (e, newVal) => {
    setValue(newVal)
  }

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    setValue("1")
    const {
      data: { message, card, info },
    } = await axios.post('/card', {
      name,
      subject,
      score,
    });
    console.log(info)
    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    updateAddInfo(info);
  };

  const handleQuery = async () => {
    setValue('2')
    const {
      data: { messages, message, info },
    } = await axios.post('/cards', {
       
        type: queryType,
        queryString,
      
    });
    console.log(message)
    if (messages.length === 0) {
      addErrorMessage(message);
      clearQueryInfo();
    }
    else {
      addRegularMessage(...messages);
      updateQueryInfo(info);
    }
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">

        <Box sx={{width: '100%', typography: 'body1'}}>
         <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleTabChange} aria-label="scorecardtab">
              <Tab label="Add" value="1"/>
              <Tab label="Query" value="2"/>
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Grid container>
              <Grid item md={6}>
              {messages.map((m, i) => (
                (m.type === "add" || m.message === "Database deleted" ? <Typography variant="body1" key={m + i} style={{ color: m.color }}>
                  {m.message}
                  </Typography> : <></>)
                ))}
              </Grid>
              <Grid item md={6}>
                {addInfo.length !== 0 ? <InfoTable info={addInfo}/> : <></>}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <Grid container>
              <Grid item md={6}>
              {messages.map((m, i) => (
                (m.type === "err" || m.type === "reg" ? 
                <Typography variant="body1" key={m + i} style={{ color: m.color }}>
                  {m.message}
                </Typography> : <></>)
                  ))}
              </Grid>
              <Grid item md={6}>
                {queryInfo.length !== 0 ? <InfoTable info={queryInfo}/> : <></>}
              </Grid>
            </Grid>
          </TabPanel>
         </TabContext>
        </Box>

        
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
