import * as CryptoJS from "crypto-js"

class Block {
   public index : number;
   public hash : string;
   public previoushash :string;
   public data :string;
   public timestamp : number;

   static calculateBlockHash = (
      index:number,
      previoushash:string,
      timestamp:number,
      data:string
   ):string=>
      CryptoJS.SHA256(index + previoushash + timestamp + data).toString();

   static vaildBlockStructure = (aBlock:Block) : boolean =>
    typeof aBlock.index === "number" && 
    typeof aBlock.hash ==="string" && 
    typeof aBlock.previoushash === "string" && 
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
   constructor(
      index:number,
      hash:string,
      previoushash:string,
      data:string,
      timestamp:number 
      ){

         this.index =index;
         this.hash=hash;
         this.previoushash=previoushash;
         this.data = data;
         this.timestamp=timestamp     
   }
}

const gensisBlock:Block = new Block(0, "202020202020", "", "this is a gensisBlock", 123456);

let blockchain:Block[] = [gensisBlock]

const getBlockchain = () :Block[] => blockchain;

const getLatesBlock = () :Block => blockchain[blockchain.length-1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string) : Block => {
   const previousBlock : Block = getLatesBlock();
   const newIndex : number = previousBlock.index + 1;
   const newTimestamp : number = getNewTimeStamp();
   const newtHash : string = Block.calculateBlockHash(
      newIndex,
      previousBlock.hash,
      newTimestamp,
      data
      );
   const newBlock : Block = new Block(
      newIndex,
      newtHash,
      previousBlock.hash,
      data,
      newTimestamp
      );
   
   addBlock(newBlock);
   return newBlock;
};
const getHashForBlock = (aBlock:Block) :string =>
 Block.calculateBlockHash(
    aBlock.index, 
    aBlock.previoushash, 
    aBlock.timestamp, 
    aBlock.data)

const isBlockValid = (candidateBlock : Block, previousBlock : Block):boolean => {
   if(!Block.vaildBlockStructure(candidateBlock)){
      return false
   } else if(previousBlock.index + 1 !== candidateBlock.index){
      return false
   } else if(previousBlock.hash !== candidateBlock.previoushash){
      return false
   } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash ){
      return false
   } else{
      return true;
   }
};

const addBlock = (candiateBlock : Block) : void=> {
   if(isBlockValid(candiateBlock, getLatesBlock())){
      blockchain.push(candiateBlock);
   }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
