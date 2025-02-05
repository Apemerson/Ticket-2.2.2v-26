import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import ColorModeContext from "../../layout/themeContext";
import useSettings from "../../hooks/useSettings";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Helmet } from "react-helmet";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column", // Flex coluna para o mobile
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Colocar tudo na coluna para dispositivos menores
    },
  },
  leftSide: {
    width: "50%",
    height: "100vh",
    backgroundImage: "url(https://i.imgur.com/fi2oM9T.png)", // Imagem padrão
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Garantir que a imagem ocupe toda a tela
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%", // A imagem agora ocupa 100% da tela no mobile
      height: "40vh", // Ajuste da altura para mobile
    },
  },
  rightSide: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Largura 100% no mobile
      padding: theme.spacing(2),
      marginTop: theme.spacing(2), // Margem para centralizar o conteúdo
    },
  },
  paper: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: theme.mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    boxShadow: theme.mode === "light" ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px 30px",
    borderRadius: "12.5px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%", // Ajuste da largura do formulário no mobile
      padding: theme.spacing(3), // Ajuste no padding para mobile
    },
  },
  logoImg: {
    width: "100%",
    maxWidth: "350px",
    height: "auto",
    maxHeight: "120px",
    margin: "0 auto",
    content: "url(" + (theme.mode === "light" ? theme.calculatedLogoLight() : theme.calculatedLogoDark()) + ")",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "250px", // Reduz o tamanho da logo em dispositivos móveis
    },
  },
  iconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: theme.mode === "light" ? "black" : "white",
  },
  whatsappButton: {
    margin: theme.spacing(1, 0, 1),
    display: "flex",
    alignItems: "center",
    backgroundColor: "#35BD4E",
    color: "#000000DE",
    padding: theme.spacing(0.75, 2),
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#35BD4E",
      borderColor: "#25D366",
    },
  },
  whatsappIcon: {
    marginRight: theme.spacing(1),
  },
  footer: {
    textAlign: "center",
    color: "black",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { colorMode } = useContext(ColorModeContext);
  const { appLogoFavicon, appName, mode } = colorMode;
  const [user, setUser] = useState({ email: "", password: "" });
  const [allowSignup, setAllowSignup] = useState(false);
  const [whatsappText, setWhatsappText] = useState("ENTRAR EM CONTATO");
  const [whatsappIconColor, setWhatsappIconColor] = useState("#000000DE");
  const { getPublicSetting } = useSettings();
  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  useEffect(() => {
    getPublicSetting("allowSignup")
      .then((data) => {
        setAllowSignup(data === "enabled");
      })
      .catch((error) => {
        console.log("Error reading setting", error);
      });
  }, []);

  const whatsappLink = "https://wa.me/5543996494382";

  return (
    <>
      <Helmet>
        <title>{appName || "TORRES TICKET"}</title>
        <link rel="icon" href={appLogoFavicon || "/default-favicon.ico"} />
      </Helmet>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.leftSide}>
            {/* Coluna da imagem */}
          </Grid>
          <Grid item xs={12} md={6} className={classes.rightSide}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <IconButton className={classes.iconButton} onClick={colorMode.toggleColorMode}>
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <div>
                  <img className={classes.logoImg} alt="logo" />
                </div>
                <form className={classes.form} noValidate onSubmit={handlSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={i18n.t("login.form.email")}
                    name="email"
                    value={user.email}
                    onChange={handleChangeInput}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={i18n.t("login.form.password")}
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChangeInput}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    startIcon={<LockIcon />}
                  >
                    {i18n.t("login.buttons.submit")}
                  </Button>
                  {allowSignup && (
                    <Grid container>
                      <Grid item>
                        <Link href="#" variant="body2" component={RouterLink} to="/signup">
                          {i18n.t("login.buttons.register")}
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                  <Button
                    variant="contained"
                    className={classes.whatsappButton}
                    href={whatsappLink}
                    target="_blank"
                  >
                    <WhatsAppIcon style={{ color: whatsappIconColor }} className={classes.whatsappIcon} />
                    {whatsappText}
                  </Button>
                </form>
              </div>
              <Typography variant="body2" className={classes.footer}>
                © 2025 - Torres Ticket
              </Typography>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
