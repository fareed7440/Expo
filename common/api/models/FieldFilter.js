import JSModel from "react-native-jsmodel";
import React from 'react';
class FieldFilter extends JSModel{
  //Nombre del campo a filtrar
  fieldBy;
  //Valor
  value;
  //Operación  '=', '<', '>', '<=', '>=', '<>', '!=', 'like', 'not like', 'between', 'ilike'
  op;
  //Relacion where 'and', 'or'
  rel;
  constructor(fieldName,filterValue,op,rel){
    super();
    this.filterBy=fieldName;
    this.value=filterValue;
    this.op=op;
    this.rel=rel;
  }
}
export default FieldFilter;
