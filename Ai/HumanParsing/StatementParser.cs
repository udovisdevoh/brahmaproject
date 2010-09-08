using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai.HumanParsing
{
    /// <summary>
    /// Statement parser
    /// </summary>
    internal class StatementParser : AbstractParser
    {
        #region Parts
        /// <summary>
        /// Converts name to concept and concept to names
        /// </summary>
        private ConceptNameManager conceptNameManager;
        #endregion

        #region Constructors
        /// <summary>
        /// Create a parser to parse text and convert it to IStatement
        /// </summary>
        /// <param name="conceptNameManager">converts names to concepts and concepts to names</param>
        public StatementParser(ConceptNameManager conceptNameManager)
        {
            this.conceptNameManager = conceptNameManager;
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// parse text and convert it to IStatement
        /// </summary>
        /// <param name="text">text</param>
        /// <returns>IStatement</returns>
        public override IStatement Parse(string text)
        {
        }
        #endregion
    }
}
