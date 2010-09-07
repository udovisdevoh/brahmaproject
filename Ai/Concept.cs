using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// Can represent a concept, an operator or an expression
    /// </summary>
    public class Concept
    {
        #region Fields
        /// <summary>
        /// Default name (for debugging and etc)
        /// </summary>
        private string defaultName;
        #endregion

        #region Constructor
        /// <summary>
        /// Create concept
        /// </summary>
        /// <param name="defaultName">default name (for debugging and etc)</param>
        public Concept(string defaultName)
        {
            this.defaultName = defaultName;
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// Get string representation from default name (for debugging and etc)
        /// </summary>
        /// <returns>string representation from default name (for debugging and etc)</returns>
        public override string ToString()
        {
            return defaultName;
        }
        #endregion
    }
}
