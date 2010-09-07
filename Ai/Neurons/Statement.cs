using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// Represents a statement
    /// </summary>
    public class Statement
    {
        #region Parts
        /// <summary>
        /// Subject neuron
        /// </summary>
        private Concept subject;

        /// <summary>
        /// Verb neuron
        /// </summary>
        private Concept verb;

        /// <summary>
        /// Complement neuron
        /// </summary>
        private Concept complement;

        /// <summary>
        /// Whether the statement is true or not
        /// </summary>
        private bool isPositive;
        #endregion
    }
}
