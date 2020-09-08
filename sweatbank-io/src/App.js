import React, { useRef } from 'react';
import './styles.css';
import { Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import view1 from './png/view1.png';
import view2 from './png/view2.png';
import view3 from './png/view3.png';
import view4 from './png/view4.png';
import view5 from './png/view5.png';
import view6 from './png/view6.png';
import view7 from './png/view7.png';
import view8 from './png/view8.png';

import Header from './Header';
import Content from './Content';

import ScreenshotCard from './ScreenshotCard';

// this is how we overwrite MUI styles
const useStyles = makeStyles({
  timeToSweatStyle: {
    // fontStyle: 'oblique',
    // color: props => props.color,
  },
});

const App = () => {
  // const [chartData, setChartData] = useState ({})
  // const chart = () => {
  //   setChartData({
  //     labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  //     datasets: [
  //       {
  //         label: 'sweatscore',
  //         data: [33, 45, 112, 76, 30],
  //         backgroundColor:[
  //           'rgba(116,109,127,.2)'
  //         ],
  //         borderWidth: 4
  //       }
  //     ]
  //   })
  // }

  // const classes = useStyles();
  // useEffect(() => {
  //   chart()
  // }, [])

  const emailFormRef = React.createRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const scrollToEmailForm = () => {
    scrollToRef(emailFormRef);
  }

  return (

    <Grid container direction = 'column'>
      <Grid item>
        <Header scrollToEmailForm={scrollToEmailForm} />
      </Grid>
      <Grid item container>
        <Grid item xs ={2} sm ={2} />
        <Grid item xs = {8} sm = {8} >
          <Content emailFormRef={emailFormRef} scrollToEmailForm={scrollToEmailForm}/>
        </Grid>
        <Grid item xs ={2} sm ={2} />
      </Grid>

    </Grid>
  );
}

export default App;