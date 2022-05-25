export default interface IRoute {
  component: any;
  path: string;
  exact: boolean;
  props?: any;
}
