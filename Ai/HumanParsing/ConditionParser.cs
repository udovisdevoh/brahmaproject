using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai.HumanParsing
{
    /// <summary>
    /// Converts text to "if" conditions
    /// </summary>
    internal class ConditionParser : AbstractParser
    {
        #region Parts
        /// <summary>
        /// Converts text to statement trees
        /// </summary>
        private StatementTreeParser statementTreeParser;
        #endregion

        #region Constructors
        /// <summary>
        /// Build condition parser
        /// </summary>
        /// <param name="statementTreeParser">statement tree parser</param>
        public ConditionParser(StatementTreeParser statementTreeParser)
        {
            this.statementTreeParser = statementTreeParser;
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// Create a parser to parse text and convert it to IStatement
        /// </summary>
        /// <param name="conceptNameMapper">concept name mapper</param>
        public override IStatement Parse(string text)
        {
        }
        #endregion
    }
}
