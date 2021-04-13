export type IDecisionTree = Array<IIndexedTreeNode>;

export interface IIndexedTreeNode {
  node: TreeNode;
  index: number;
}

export class TreeNode {
  public readonly id: nodeId;
  public readonly description: string;
  public readonly nameYes: string;
  public readonly nameNo: string;
  public decision: boolean | null;
  public readonly yesId: nodeId | null;
  public readonly noId: nodeId | null;
  constructor(
    id: nodeId,
    description: string,
    nameYes: string,
    nameNo: string,
    yesId: nodeId | null,
    noId: nodeId | null
  ) {
    this.id = id;
    this.description = description;
    this.nameYes = nameYes;
    this.nameNo = nameNo;
    this.decision = null; // <-- must be null on creation. wait for decision from user.
    this.yesId = yesId;
    this.noId = noId;
  }
}

/**
 * Possible values for a node id.
 */
export type nodeId =
  | "tipoDeExperimento"
  | "experimentoObservacional"
  | "experimentoExperimental"
  | "ruidoFactor"
  | "tipoFactor"
  | "dominio"
  | "dominioDiscreto"
  | "tipoVariable"
  ;
/**
 * Dictionary of nodes by their id.
 */
export const nodeList = {
  tipoDeExperimento: new TreeNode(
    "tipoDeExperimento",
    "Selecciona tipo de esperimento",
    "Observacional",
    "Experimental",
    "experimentoObservacional",
    "experimentoExperimental"
  ),
  experimentoObservacional: new TreeNode(
    "experimentoObservacional",
    "¿Es una variable de tipo de salida?",
    "Si",
    "No",
    "dominio",
    "ruidoFactor"
  ),
  experimentoExperimental: new TreeNode(
    "experimentoExperimental",
    "Nada por ahora",
    "Nada por ahora",
    "Nada por ahora",
    null,
    null
  ),
  ruidoFactor: new TreeNode(
    "ruidoFactor",
    "¿Es un factor o un ruido ambiental?",
    "Tipo Factor",
    "Tipo Ruido ambiental",
    "tipoFactor",
    "dominio"
  ),
  tipoFactor: new TreeNode(
    "tipoFactor",
    "¿Que papel desarrolla dentro del experimento?",
    "Factor controlable",
    "Factor predeterminado",
    "dominio",
    "dominio"
  ),
  dominio: new TreeNode(
    "dominio",
    "¿El dominio es discreto?",
    "Si",
    "No",
    "dominioDiscreto",
    "tipoVariable"
  ),
  dominioDiscreto: new TreeNode(
    "dominioDiscreto",
    "¿De que tipo es el dominio discreto?",
    "Numerado",
    "No numerado",
    "tipoVariable",
    "tipoVariable"
  ),
  tipoVariable: new TreeNode(
    "tipoVariable",
    "Selecciona el tipo de variable",
    "Entera, Cadena",
    "Flotante, Booleana",
    null,
    null
  )

};
