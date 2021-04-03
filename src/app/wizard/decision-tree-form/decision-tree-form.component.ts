import { Component, OnInit } from "@angular/core";
import { IDecisionTree, TreeNode, nodeList } from "./nodes";

@Component({
  selector: "app-decision-tree-form",
  templateUrl: "./decision-tree-form.component.html",
  styleUrls: ["./decision-tree-form.component.css"]
})
export class DecisionTreeFormComponent implements OnInit {
  public decisionTree: IDecisionTree;
  public currentNode: TreeNode;

  public treeJSONhidden: boolean = true;
  public nodeJSONhidden: boolean = true;
  constructor() {}

  ngOnInit() {
    this.reset();    
  }

  public reset() {
    // Init base node and tree here.
    this.decisionTree = [];
    this.currentNode = Object.assign({}, nodeList.chestPain);
  }

  public yes() {
    this.currentNode.decision = true;
    this.pushNode();
    this.currentNode = Object.assign({}, nodeList[this.currentNode.yesId]);
    if( this.isFinal(this.currentNode)) {
      this.pushNode();
    }
  }

  public no() {
    this.currentNode.decision = false;
    this.pushNode();
    this.currentNode = Object.assign({}, nodeList[this.currentNode.noId]);
    if( this.isFinal(this.currentNode)) {
      this.pushNode();
    }
  }

  public isFinal = (node: TreeNode) => node.yesId == null && node.noId == null;

  private pushNode():void {
    this.decisionTree.push({
      node: this.currentNode,
      index: this.decisionTree.length
    });
  }
}
