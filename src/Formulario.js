import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

function enviarDados(
  personEmail,
  personTribe,
  personSquad,
  title,
  description,
  type,
  impact,
  timeSpendToday,
  timeSpendFuture,
) {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Bluesight-API-Token", "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0MywiY3VycmVudF90aW1lIjoiMjAyMC0xMC0xNlQxNzo1ODozNS4zNTIrMDg6MDAifQ.4Pdfx7GO-Br3ciQzQugNZUpJmCNXwWuB_8bAztkk4mQ");
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\n  \"query\": \"mutation {\n    createCard (\n      input: {\n        cardAttributes: {\n          squadId: 463\n          swimlaneName: \\\"Kaizen\\\"\n		  workstateName: \\\"Bank of Ideas\\\"\n          title: \\\"" + title + "\\\"\n          description: \\\"" + description + "\\\"\n          secondaryLabelName: \\\"" + impact + "\\\"\n          customField1: \\\"" + personEmail + "\\\"\n          customField2: \\\"" + personTribe + "\\\"\n          customField3: \\\"" + personSquad + "\\\"\n          customField4: \\\"" + timeSpendToday + "\\\"\n          customField5: \\\"" + timeSpendFuture + "\\\"\n           primaryLabelNames: [\n		   {\n		     value: \\\"" + type + "\\\"\n		   }\n		 ]\n        }\n      }\n    )\n    {\n      card {\n        identifier\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\"\n}\n ";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://singapore.bluesight.io/graphql", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data.createCard.errors != null) {
          resolve(result.data.createCard.errors[0].message)
        } else {
          resolve(true)
        }
      })
      .catch((error) => console.log("error", error));
  });
}

export default function Formulario() {
  const [personEmail, setPersonEmail] = useState("");
  const [personTribe, setPersonTribe] = useState("");
  const [personSquad, setPersonSquad] = useState("");
  const [ideaName, setIdeaName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [benefits, setBenefits] = useState("");
  const [timeSpendToday, setTimeSpendToday] = useState("");
  const [timeSpendFuture, setTimeSpendFuture] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!error) {
      window.location.reload();
      // setPersonEmail("")
      // setPersonTribe("")
      // setPersonSquad("")
      // setIdeaName("")
      // setType("")
      // setDescription("")
      // setImpact("")
      // setBenefits("")
      // setTimeSpendToday("")
      // setTimeSpendFuture("")
    }
    setOpen(false);
  };

  useEffect(
    () => {
      var values = [
        personEmail,
        personTribe,
        personSquad,
        ideaName,
        type,
        description,
        impact,
        benefits,
      ];
      var i = 0;
      while (i < values.length) {
        if (values[i] === "") {
          setButtonEnabled(false);
          break;
        }
        i++;
      }
      if (i === values.length) {
        setButtonEnabled(true);
      }
    },
    [
      personEmail,
      personTribe,
      personSquad,
      ideaName,
      type,
      description,
      impact,
      benefits,
      timeSpendToday,
      timeSpendFuture,
    ],
  );

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="personEmail"
            name="personEmail"
            label="Person Email:"
            fullWidth
            defaultValue={personEmail}
            onChange={(e) => setPersonEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="personTribe"
            name="personTribe"
            label="Person Tribe:"
            fullWidth
            defaultValue={personTribe}
            onChange={(e) => setPersonTribe(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="personSquad"
            name="personSquad"
            label="Person Squad:"
            fullWidth
            defaultValue={personSquad}
            onChange={(e) => setPersonSquad(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="ideaName"
            name="ideaName"
            label="Name of Idea"
            fullWidth
            autoComplete="fname"
            defaultValue={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Type *
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormControlLabel
                value="Automation"
                control={<Radio />}
                label="Automation"
              />
              <FormControlLabel
                value="Process improvement"
                control={<Radio />}
                label="Process improvement"
              />
              <FormControlLabel
                value="New tool"
                control={<Radio />}
                label="New tool"
              />
              <FormControlLabel
                value="Others"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete=""
            multiline
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 400 }}
          />
          <p>Max : 400 Characters</p>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Impact *
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
            >
              <FormControlLabel
                value="Squad"
                control={<Radio />}
                label="Squad"
              />
              <FormControlLabel
                value="Account"
                control={<Radio />}
                label="Account"
              />
              <FormControlLabel
                value="Tribe"
                control={<Radio />}
                label="Tribe"
              />
              <FormControlLabel
                value="More than one tribe"
                control={<Radio />}
                label="More than one tribe"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="benefits"
            name="benefits"
            label="Benefits"
            fullWidth
            autoComplete=""
            multiline
            defaultValue={benefits}
            inputProps={{ maxLength: 400 }}
            onChange={(e) => setBenefits(e.target.value)}
          />
          <p>Max : 400 Characters</p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="time_spend_today"
            name="time_spend_today"
            label="Time Spent in the Current Scenario (min/month)"
            fullWidth
            autoComplete=""
            multiline
            defaultValue={timeSpendToday}
            onChange={(e) => setTimeSpendToday(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="time_spend_future"
            name="time_spend_future"
            label="Time Spent in the Desired Scenario (min/month)"
            fullWidth
            autoComplete=""
            multiline
            defaultValue={timeSpendFuture}
            onChange={(e) => setTimeSpendFuture(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {isLoading ? <LinearProgress /> : ""}
          <Button
            variant="contained"
            color="primary"
            disabled={!buttonEnabled}
            onClick={async () => {
              setIsLoading(true);
              var title = "Idea : " + ideaName;
              // , type, description, impact, benefits, timeSpendToday, timeSpendFuture
              var body = "";
              // body += "" + personEmail + " , " + personTribe + " , " +
              //   personSquad + "<br/><br/>";
              // body += "Tipo: " + type + "<br/><br/>";
              body += "Description: " + description + "<br/><br/>";
              // body += "Impacto: " + impact + "<br/><br/>";
              body += "Benefits: " + benefits + "<br/><br/>";
              // body += "Tempo Gasto no Cenário Atual (min/mês): " + timeSpendToday + "<br/><br/>";
              // body += "Tempo Gasto no Cenário Desejado (min/mês) " + timeSpendFuture + "<br/><br/>";

              var res = await enviarDados(
                personEmail,
                personTribe,
                personSquad,
                title,
                body,
                type,
                impact,
                timeSpendToday,
                timeSpendFuture,
              );
              console.log(res);
              if (res !== true) {
                setError(true)
                setErrorMessage(res)
              } else {
                setError(false)
              }
              setIsLoading(false);
              handleClickOpen();
            }}
            style={{ width: "100%" }}
          >
            Submit Data
          </Button>
        </Grid>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {(!error) ?
                  "Sent successfully! \n Thanks \n You can close this page"
                  :
                  errorMessage
                }

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </React.Fragment>
  );
}
