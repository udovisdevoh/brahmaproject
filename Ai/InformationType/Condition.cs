using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// Represents some kind of "IF" condition
    /// </summary>
    internal class Condition : IStatement
    {
        #region Fields
        /// <summary>
        /// Whether the rule is true or not
        /// </summary>
        private bool isPositive;

        /// <summary>
        /// Condition
        /// </summary>
        private IStatement condition;

        /// <summary>
        /// If condition is true, effect is true
        /// </summary>
        private IStatement effect;
        #endregion
    }
}
