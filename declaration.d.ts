// For CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS modules
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}