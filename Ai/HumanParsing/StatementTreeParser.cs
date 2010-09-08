using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai.HumanParsing
{
    /// <summary>
    /// Converts text to statement trees
    /// </summary>
    internal class StatementTreeParser : AbstractParser
    {
        #region Parts
        /// <summary>
        /// Statement parser
        /// </summary>
        private StatementParser statementParser;
        #endregion

        #region Constructor
        /// <summary>
        /// Build statement tree parser
        /// </summary>
        /// <param name="conceptNameManager">concept name manager</param>
        public StatementTreeParser(ConceptNameManager conceptNameManager)
        {
            statementParser = new StatementParser(conceptNameManager);
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
            text = text.ToLowerInvariant();
            text = text.Trim();

            if (!text.Contains("&&") && !text.Contains("||") && !text.Contains(" and ") && !text.Contains(" or "))
                return statementParser.Parse(text);
        }
        #endregion
    }
}
