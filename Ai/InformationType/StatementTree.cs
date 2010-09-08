using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// Statement tree
    /// </summary>
    public class StatementTree : IStatement
    {
        /// <summary>
        /// And, Or etc...
        /// </summary>
        private enum Operator { operatorAnd, Or }

        #region Parts
        /// <summary>
        /// Whether statement tree is true
        /// </summary>
        private bool isPositive;

        /// <summary>
        /// Left child
        /// </summary>
        private IStatement leftChild;

        /// <summary>
        /// Middle operator
        /// </summary>
        private Operator middleOperator;

        /// <summary>
        /// Right child
        /// </summary>
        private IStatement rightChild;
        #endregion
    }
}
