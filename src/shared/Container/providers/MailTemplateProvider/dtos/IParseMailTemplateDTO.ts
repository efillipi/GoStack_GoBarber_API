export default interface IMailTemplateProviderDTO{
    template : string;
    variables: IVariables;
}

interface IVariables{
  [key : string] : string | number
}
