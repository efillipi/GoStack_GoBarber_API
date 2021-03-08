export default interface IMailTemplateProviderDTO{
    file : string;
    variables: IVariables;
}

interface IVariables{
  [key : string] : string | number
}
